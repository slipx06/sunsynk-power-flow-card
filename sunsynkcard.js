class SunsynkCardConfigEditor extends HTMLElement {
	constructor() {
		super()
		console.log('editor: new instance')
	}

	setConfig(config) {
		this.config = config
		this.innerHTML = this.render(config)
	}

	handleChange(e) {
		const event = new Event('config-changed', {
			bubbles: true,
			composed: true
		})
		event.detail = {
			config: {
				...this.config,
				[e.target.id]: e.target.value
			}
		}
		this.dispatchEvent(event)
	}

	connectedCallback() {
		if (this.isConnected) {
			this.addEventListener('change', this.handleChange, { capture: true })
		}
	}

	disconnectedCallback() {
		this.removeEventListener('change', this.handleChange, { capture: true })
	}

	render(config = this.config) {
		return `
			<paper-input label="Entity" id="entity" value="${config.entity}"></paper-input>
		`
	}
}

class SunsynkCard extends HTMLElement {

	static getConfigElement() {
		return document.createElement('sunsynk-card-config-editor')
	}

	static getStubConfig() {
		return {
			entity: null,
            content: [],
			actions: null,
			bindings: []
		}
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	setConfig(config) {
		this.config = config
		this.shadowRoot.innerHTML = config.content
		this.storedValues = []
	}
	set hass(hass) {
		this._hass = hass
		this.renderState()
	}
	get hass() {
		return this._hass
	}

	storedValues = []

	renderState() {
		const { hass, config } = this
		if (!hass || !config) return
		let entity = hass.states[config.entity] || { state: 'unavailable', attributes: {} }
		this.config.bindings.forEach(({ selector, type, bind }, index) => {
			if (!selector || !bind || !type) return
			this.shadowRoot.querySelectorAll(selector).forEach(target => {
				const prevState = this.storedValues[index]
				let nextState = null
				try {
					const getState = new Function('hass', 'config', 'entity', 'state', 'attr', bind)
					nextState = getState.call(target, hass, config, entity, entity.state, entity.attributes)
				} catch (e) {
					console.log('BINDING --> FAILED', bind)
				}
				if (prevState == null || nextState !== prevState) {
					switch (type) {
						case 'class':
							prevState && target.classList.remove(prevState)
							nextState && target.classList.add(nextState)
							break
						case 'text':
							target.innerText = nextState
							break
						case 'html':
							target.innerHTML = nextState
							break
						case 'checked':
							target.checked = !!nextState
							break
						default:
							if (typeof nextState === 'undefined' || '' === `${nextState}`) {
								target.removeAttribute(type)
							} else {
								target.setAttribute(type, nextState)
							}
					}
					this.storedValues[index] = nextState
				}
			})
		})
	}
	handleAction = e => {
		const { hass, config } = this
		const entity_id = config.entity
		const entity = { state: 'unavailable', attributes: {}, ...hass.states[entity_id] }
		if (entity_id) {
			const [domain, id] = entity_id.split('.')
			const services = hass.services[domain]
			for (let service in services) {
				entity[service] = data => hass.callService(domain, service, { entity_id, ...data })
			}
		}
		this.config.actions.forEach(({ selector, type, call }) => {
			if (!selector || !call || !type) return
			if (type === e.type && e.target.matches(selector)) {
				try {
					const setState = new Function('hass', 'config', 'entity', call)
					setState.call(e.target, hass, config, entity)
				} catch (e) {

				}
			}
		})
	}

	connectedCallback() {
		if (this.isConnected) {
			this.renderState()
			this.shadowRoot.addEventListener('change', this.handleAction, true)
			this.shadowRoot.addEventListener('click', this.handleAction, true)
		}
	}

	disconnectedCallback() {
		this.shadowRoot.removeEventListener('change', this.handleAction, true)
		this.shadowRoot.removeEventListener('click', this.handleAction, true)
	}
}

customElements.define('sunsynk-card-config-editor', SunsynkCardConfigEditor)
customElements.define('sunsynk-card', SunsynkCard)

window.customCards = window.customCards || []
window.customCards.push({
	type: 'sunsynk-card',
	name: 'Sunsynk Card'
})
console.log('Custom Element: SUNSYNK-CARD initialized.')