import {
	InverterSettingsDto,
	InverterStatus,
} from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class Victron extends InverterSettingsDto {
	brand = InverterModel.Victron;
	statusGroups: InverterStatus = {
		off: {
			states: ['0', 'off'],
			color: 'red',
			message: localize('common.off'),
		},
		lowpower: {
			states: ['1', 'low power'],
			color: 'yellow',
			message: localize('common.lowpower'),
		},
		fault: {
			states: ['2', 'fault'],
			color: 'red',
			message: localize('common.fault'),
		},
		bulk: {
			states: ['3', 'bulk'],
			color: 'green',
			message: localize('common.bulk'),
		},
		absorption: {
			states: ['4', 'absorption'],
			color: 'green',
			message: localize('common.absorption'),
		},
		float: {
			states: ['5', 'float'],
			color: 'green',
			message: localize('common.float'),
		},
		storage: {
			states: ['6', 'storage'],
			color: 'green',
			message: localize('common.storage'),
		},
		equalize: {
			states: ['7', 'equalize'],
			color: 'green',
			message: localize('common.equalize'),
		},
		passthru: {
			states: ['8', 'passthru'],
			color: 'green',
			message: localize('common.passthru'),
		},
		inverting: {
			states: ['9', 'inverting'],
			color: 'blue',
			message: localize('common.inverting'),
		},
		powerassist: {
			states: ['10', 'power assist'],
			color: 'blue',
			message: localize('common.powerassist'),
		},
		powersupply: {
			states: ['11', 'power supply'],
			color: 'blue',
			message: localize('common.powersupply'),
		},
		sustain: {
			states: ['244', 'sustain'],
			color: 'green',
			message: localize('common.sustain'),
		},
		externalcontrol: {
			states: ['252', 'external control'],
			color: 'green',
			message: localize('common.externalcontrol'),
		},
		discharging: {
			states: ['256', 'discharging'],
			color: 'green',
			message: localize('common.discharging'),
		},
		recharge: {
			states: ['258', 'recharge'],
			color: 'green',
			message: localize('common.recharge'),
		},
		scheduledrecharge: {
			states: ['259', 'scheduled recharge'],
			color: 'green',
			message: localize('common.scheduledrecharge'),
		},
	};
	image =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAABICAYAAABWWr1vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABgBSURBVGhDZVtprF3VdV7nnDu+5/f8no3tZ2PAmNhmMKkNCAURCFWiFqia0DCoVSq1QWmRKrWVKlWR0kFVRKv+6Q/6o4qiNr9QJIoqRCapVdQ0apumjA7FGGNjDB7fPL87nnP6fd/a+95rWPfus9de81p7n32G+17y0Bd+Zeb82TPPF3neLMtyPEmS8aIomhPTOyuVe5/6q+51t7fS2pglaWqJJWWJIyGxAuJFQQxEfEWFCBqF0EMyAZ1jgyA10ICgz0kD0fVgQBZN9GgspQUaTZI0S4oktTK17ma689JPvrD4yve/XPR7W1madBDIVpqm7TTLPnzwoQcfSY7dffdXrl64+LzbcfOEfPt+a9/xuKUzRy2tN+mC5sWjU3eHUDCIAY2CMgEoP1l1XVIIzFZWIjnipEc/IBCVKA9lYWWvbf1Lb9nYyRctW7kg2ZSqjA9Ce/bOPJ41G42/7Ha7tyNbBRaqZN1t+6zYd9zSid1WZjVoVdAyK9HUw2FpqJ3GDII8Ju7N6XEsr6EFOjPA7BPHPMiWywb7WhlxDFw8NvhFkP3lC1bfvCpcCaNKKlxpO5OHH36kNTs33+BKcj5YULw4edQ69/2RNXbscYMA6kYZfhljLAJQLTGfgSAjauzj0YG6pJA7lCAAc6Y6phaZKiQTam1Z8YsX7Zbz/wx/SJ0FwHQx7pmZPTlWVjOv1WrWHBtDa1qj2bR6vW61+phlzSmrj21DG7fG+DZrjrMft3rTadXmuNXQswlveO9tm1UaY2jj6qvCx1wm0DMs62poFbS01rSs1kCrW1WtYRX0bBpXa2oZGuVZbCWjhJh+YpVKpYd1UhbMMEO2KZjh5ISQ1zpWjiPOhNMcQgF99tAiX43j0MSnIKBPOxjkOER+bJSLwDBkPzghiwsGG0OI01mcpSzLRGMegCKlPVemIBNDg5Db4hHpwFuOiLlb+Y7lCTIQAqViECRpnQNzH04jxMBz4Uwq2nEfNDBIBjBS1mEvvi+5LKtAHj3OSU4KeXlR5GkJi31E2u31rIPGclBYAKE+EwlRxUDcv6yLFxvFGJx6MClHnCAZ9AqejTjpYMAMwOUpR/BuSPNk5VXLLQMhq3CGUvA9LiRkeZ6XyVe/+a1v/WT9hmc6PUaPGmLbJLSbe6w6cxjzzWrQlCcTgTgbWSKL6SfyxyEmKgiI9Aa42yfE5U+IS8xxLi8gaJgI664tWHX9IgdIDJOA2aogyQd2XP675IWz659/9mf24+XNQnXIMIvMK4dHVogBackxMPod+vSqhsAIZLFiA5EQrPQCcGYII7HLBhMb0lyPx0jj/isZINwSwmpTr+TBY//YsewZkPprSNBqmSckkBCRYUDssHsGcEQylNUIAaPReAgHLSQQmiAgPjtheQHzJRQ1YEF2fMxil2FMnN9BoRSUGyWplyd58uL7S8f+5ue1N1cxU7ubiT15KFewr8+a/fRiYp/fz5ktrYktZbFVWq9IrYNVOt1AwoiCuw6D+Z/Lpa226di9yQ0PGA78A1EuATwwL5zLK2TJsOqBHXRwwBe1HyxFymg3dJb6h++sPJ1is+hLBYTtDbO5dmqfmjZ75lhif3jc7NRKYZe3SjuxWNpc1+ziVmFL3QJyhV1qFbbSKbCWzda6rCZioCE0zhYXtM7QQOMJ7u49YJI51qxIJ+qTH2RF92QJSlR8sdCLIhpbpd+pZ5954KE/+UV+4LOdXmnLHbOTi8gYC/WDNbNLm4m9esXsynpiS63E5jBeQb/YMpvd4Di1C+upvQcdbRAwyiv84LYiAoacTfkNwRMnMDD1ofGgmYCUNg2NYYINbM4UbaBTI4+rRYDu/vFLG6lN7vovnmwk0DHvkl8+W9h3T5b2w7NhaQQdB68bHbhZChDFAZ5Jl0s5dud+ANuV4lB95Ct+No7pY4D7OUdgmDRBO+pJZM8xDox/YeyGH6czN914NSpHKBHcyCPA0JDGHrgvjyFohEMsmiAQ+SGdgdKI6w/bJ1RwZAwxmciPiVOLer7BsA03mSSr9lIy+mSQQIWoiEYhDjjWFhpoogNwC4xjEOY38GkrrvVSt1tRg+Czx/YJoIFgIwqMarNnsgQehxh56CFA6RQZll7d4exwKrmeYyIED3SkURBM90EKKzaUi+dOGPAgWrjgjDSKRFmGBEIA0UbGDpCBnszGsYxE6bJMcSOh5H158ECOzw4bwad4oOcQmFrL6NkG/kdkYwDyy3Gkx6ZxSEUHBum8UYiyKlpgupzbj40X9xR3SkEYBxjVzhKCY8edpaILMxp6PFfrIk0Zbz4DKkhUQhsthBrIajiITlnCiH78EMSXfW+CgERd94EisGHs3ATP/LiCapvExx165d2Yu2CvbRNfKsdZiTMkHSByFta8FEeAtiXxMbr7GdokTlcqHEij/jjy4nmMMjnofcaQaJniYQq3EEMBAtViNQd0GXUgbXD+aQyDujZBaPAc9jGQj2BE+EgPYGGp6fbcfwx8cNmTuu90bByKFfkAxqRL1KgBirJXQfyA8fDFCqtYgRaXI28uKaImFwRgAz11agNuQIZjSGHACdbKUO88xsZGP3zU8Ef7IAPrjEkrIChoRkFJcRs3mF3xpCctAZ35dWBYId7B09YQgnzQEQCPu+fQrgfBXjyVi8xACzKkMIlIUzIjQBs+Eb4MGRtXjieJpKCMFcjq+xKIhnXxcyF58ZvIGMK1oGpHGAiM0AKQRdsEmh1djsSoIR8KQgPtno6T78Uliee4LjtswCUmUV2ngnNQBsYAMaTYUyEaJ0Q1wihOhTiPXpQh388Z/8QRe5octcGY+lBWQflF78VFjOhU4CBLtcByQN7JP7w9e9u33x5/Z621BE7H+nkBo/66TJsBIwMUYVeLa5nXAwVFwcAhT6NwkKo86itQz8gkg/t4ELjUguYAGAMtxlVAPcpyxF5j4b6E9SxYHrQvHUl/E0nN3fbtk2PvbPZ/Fwrn8bzUGyaCfTouP1qLlYvbtsZCnOxUgicooh8AHkbUEV+0IUSKS/gopusJOpULiqBX4UEpwyN9v/eSffHQ9qfSXFVizWKtmDJpNMKz2cfeOOYbU+eTpzuGsA1iNQc5OncZ0kq+vVUf7FFPtPBmljz5cRm/v/PxoYnDdnT7Hbartstu33478KN2ZPxWu2v6Hrtr8rgdnfq0TVd2YGap65D8/dvzt/3TyeY7zXIZRL6RiaywzFBZ1Qs9x3x/od1GciEB0nkIpWQqSoi0AKq0MLfnus4X3ZnoSGNB0UHfLw/UQYrcEAKPKcdQ2XH25tpT9tjh4snkuf9buPU7Jxun1vB0O4Yn2P3b+FqstI/WEju2Cw+OeESvW8/qtaqdmNPNlG10S7tle2nzeGBc4iM8nGueUWFPKLjyr2BIj4F7HsRioAR2DFbXwZBQVIy7r79L4a7nSfNuRhTgv3G4/2Tax6rkbHMjOLg9sV+7ObX796X2lVsTu2U6sXtmUrtxe4pH/cR+60gBemmf3mV2287EduDxX+kwKfnGbDpFTngUrqR9zINmPLRRUF44MBey4kyP4i5U2uHJlv3x7pP25wc/tM/VzooVJbGls9Jeu6VWYVc2cnttrm8/my3s9GLfzq30bL6T2EKrZ68uZHZiIbHZLbMffJDaOcymB+KV1k7EnjRYJO6YN2YREybFaZBH5TULaIydS4mTQXXPJWr5MmRRdo1ndjBZsPrsW3Z4inouAV0khUuVB2TWQXL/O8clldpGB8urk9rp1dTOriZ2ZiWzzU5hW/3C2nlIAkZc1w06hV0IIThSSAEneAkJniR3W+608Zrp79l91uPlxYGIF+viutl/dvbbu9uO20eV/SEOF0qee+nfvv6P3fv/ttPO7cC2wppZ36bGMqRaYEZK21kvcO0qbQmzNVZL9ZqsWuY2VuWaNltre0Dn1qvW4nspBYBARwMJtFFgANx0eCOs3ysUEO8QxEYfkKBHe6TxHaUAuE4tAfXhM6nYE9Nnnk2+/t0fPfaj7HMv4ZTxaUeLFY4/CrCy0SmhBwZFeHGO0ZOjbURDJuX00GlMmUGsAUQHkWSKSoYfBHnjRIFNyez6cV6kE2sXqU2gsJc3S9vXLFBos2YVBcfKWutlNrdp9tDEhd9P/vrE8pEXTtffXdlk9DAJJ/1+X8loCSBykj0Yd9njUmGVwfdAPGAMmc5IdDgQ13CEjp5BSjrQOFtuzWeE3CPTfdvqGVZFaTVUe6OfWqPicvvGSr3G47WU7xw3eolVwXvkQO+J5NkTi7e+cLp5im9oaSlfWbDK9//MphqpTV+3y9bX1vhDlrW7PWu3O7axgXIAIG31esP2Xr/PVtc2FOTuXbtsfn7Rur2ura1vWPOXv2YLO35JARKYAHPJoP2Z/ZmdWcp10t88VbHXLmueXRYHrhjfJbE8MaCeVlLgE4ZL1Jctt/pHb+4/wVMnobJLJjZRbFj98gnb2b5k21bO2m0THXvwwJgdbiDIhVOWXnzTkgtvWIZWu/SGTc6/bTflF+2W8rKNz56wT6VXrH7pNbP3/9uuW36ThkP9zcarBZZSbnuaXZ27zbTHn15se61v1431be9436qZbxhRhxCXMoHFdPBXaORQmo9D/viBIsSlwwN1+RsPxY4cOWJXr1y12atX7ZVXX7fzH563pYXFaxx0rzf7YO+Cra6s2BpmdGV5xZaWlm1hfgHmYBm3VLGYdLaJ5XNpI7PlTgUX99Km61jqVtHuqtsjyEmcwanSQ19068UPVG0wvnx1GoDppwPooPmbYoqi56t1GsyxGXDaGcwH5z+y2SuzXkE08gtUeGqpaTfPziiBrVZLzt577yx6X/ewIKcOoAWn/DX+wlqKExw7KS4qm+3CVrGrrndT6zMYyDAWabEPOE3JBo36F3yOPeG4sfG9H8jiSrcs+hAq7P1z53T+LC+v2t69M7Zrz26rVqsDo9TZ2Nyy2dlZW11fx3m1jtlat+npqRiDJ+WhMBrRqFvB4s9Qzm01LPcadlME0S0SzGSiWzSen4qFekCYmCfiuy4tkUecyQRJLUe2VI/mQZCgPz2ApT5/KgV0u23b2tyw1uam1r8bd2n9jIK+3+3ixMT1DBsE50iPLPDGpGh48OwVILHc7tmDZ6BaBde53O7bh7v1EDhNM4LBKwMcSPdlrIPLqIkpOa00jZEUmmZKguj5iwfxQ4cOWaNetxtuuMFW1jYxGxvY6vkTdCgdYGJiwvbMzNiOnTvtxptusl3Y/SYnJ21y+6RkyqwqUW9cfq6+ggv5qcWeYZJsop7Zz6/S8xAYYAySq8ZBUfpRdI+ZY8oqSeAse/KNV+fu/Jez429tYk0TGhUshYvvWNla1TVKRlF5rz6n32klZo3LgZZL3GF4PwyG14/ddz1kH23UlRR5ykhQ2mQt1+IkjRfVjv9KNggyggoSe9lxG9zCvac09wDwMSGPHOw9nnzjldk7Xzy77a0tnLR0Rt/6vRfx8tE+2ndF1iIAZcTDQV8m5OA719Axu2BGoOBoKirQqUesocg4RHa0I4BcTNoTAuBA/6DYowfzL/NCnnF/500k/7yArQeC1iuBvvjhkAajA/UuIxZdAdH5E3TZqQXcaSwYGqjuw8MRXTh7l4862nVJYyNOXqTLn8tyzJaq+Bygi3fH1IhPwC7oveScHfpQqZB4BJ4/pHiQLk8Z2QI6GjSbS3MQaZBjLEEu+h/KRjk0EiINH8gm3NI9wKDERuCUuyPSQ88xIQqquaNgezCgpGjCOWLzTi92ok10sZAku6j70p/dobF0g02efBdxUWQed3DueHSnB2IlxrIIdJvh65iK7AnqA1EocH5H+WGsl6Iw4DzK+9IkpuKhV1748HnJV4O4QQaHONLezLTwAarZh7LPnKjeCycflxlucFxq8UPw9S5btKzgFISU3ZkH4bg+gU5QfRx1unZN4oEIphauaBqqyR1LD4QkxYCqUi8mTnnad9nQhOuIjyeVcKMYCKBx1pioko1EKXiC7B0c83PIwcUpGwoj3GlcTgS/hSHw/s1tqgWcOqJLItoR2e1geC24D8rxcs8f3SAHohySOayKGoWpB+CSVFJBluAxuJ4HS1ukeWOB2HNmrkmSogTa9M4hMNym6xN0mQiKuuRwGEg+mxw7HeeU38o405U96OiIuI8dEDwyI48G6FMBDPA4dj0WgeeNLnmgsVCi4xjtEETlQVPlwHNnONSClU8HJj30E0iST/lHOyRJFwcSicdZoaD0iDIoBBfIYngCznM+B2EMXEkM+OyjsndDWmCgH9Awdv1h89TEVMcxbXMbDD6KdHr+1P0SRmqjCjTG4CMoYOqyByJDyDrKKFHSoB+vT3HmBBSQMPWkig5yoofeueLRQlQd6IYTzTvExztX4tLlAXf+S+fuTL72/L9/9Xudu7/T6/Fm1ZPhBhQTILAnpjHxyHM76gjsdY9IfhhTjr0CJRFwfE9p+yfxDAafDez/0/XErm6VVstcvot7wRqegHlvyBcv9WpmDSTAP/RiMpvdwnY0eclIrV5JIG/2g9PwDR8P1t7707Q4cM+bckpvIZqQgi/BQFdiaoFPxDP3oAON54l+yQ+62hm9lA5A+3li2xDkwfHUtmelfbSCBHDStfGwWOXTMu7VVjfNOrgfHYMtPNnYZquwLfCLHhpk17ZyW2mZreFGvEBWcgPz+XW3vJ/ioUweGbC2duCKddArBfEHQHQkTpdAWjQc6EyGF2DKKWHRNLQexkkNj/ZbfTu/ldhY0+zKZmlzmK3TS4VdAG0ND4xzncwW2mYLSGgWCbQxFR9tZbbSrdh8t6Y/EDuzgifzde4BHkUX23ny2/+xcte/nrHXufx4DviFGIADA2AyPEfIJIe7iiRiD6CcAMPBpIjl55+wMGaeY1hmzUr0xVkt/IcGSRLkOaB+3sosDrQT8UinlfhIcu+e7pMpBvrTZvqOO5sL0gCFPZFIJ6gPB+dhgJ4OdV0JuBp43jvQOR/bF5DEUidVtRfbOHs0jTxP2CAYcVfzTYcHgPgADtVCQqTTVfLYy1e++NPTay/nlQbISELV82QYjIux02GERilHfcwvUwgQxi4PHIiHGAgBRAmkQTI+CswRjcATf3gA2amV/qbde6D5peRXH33010+9e+Z7fGEZXw4ygAiO8hBo6EI6MhaTd8OkO03+4lIO9FGg+NC2z0r0q7dY1NUYxcAuR4zx6TzFQL8JS0cqgqLI7a7jxx5Me51uZjlO3V4XXceKfg+LvY+7XNDQsN2g4Vmb6yr+iTdxXuz4IobP0aRLx1vCcR849SiDMWnYfbFcgbPBBl9HJgwu8GUHrYTuAIf+tTEFu+DlvZ7H3GujxxYJWq1araX9Xuder5pvlexzMOPFl1UiXxVTRUPFgPOv9uO/U/DPFfRX/WiOo0GXfaSxuqRpVv3rQIR2ITPg4WQl7vruN86m7uSpEmgw7jhoiwuz92XVWuO5bre7W9MNIo8MfnNj3Sr6HwpcvyENu8JpRI0EydKwBz3gDRr9gScZjkcTCnzwBmPh3CHp04skvaAvNj58kdput/TvGwQuQV70uZu2Wu0doCc1OuOLyqzCAEJqQZBVcXNUxnJgIgrCHWlG2AJOHvMVjUUBwRNCC3zX9QBlIyQ7bLRBrssSOEPEdYEBzlXFxpdBOvcYNiDHUoVuWonBOMPvrGTwGquhHwGxKMQA1IiyLEERzjT/kU95cigYwM26nAfn/aCJH3XI5/kMD4iZpwnPV9EoAz5PmxTrleBEdFxtXn1fAuSIzQsSRjINRc5ifBeoNMjHl7LBnAPJcHpNoByTEWB0NRBcHgGLzhIFPV2VAPKBcy3zc1ZjhouYFfaRI4dPtVvtW5k51Rg2l+PGxob+IaQS/kMn8vgF6r06yjMQHzu40EjYaNIOwTnEcQQGqkeNAMHFJ4AyfeyQtVodI8gHm9RvNBpvJJ994P6/WF1Z+SZ/UGu329brccvEzeNWy3rcSgGshn4FCU7Z0wgD4vkQrxkE0hQcbKggIH88ONogf1SHK4O0aNujdB53T+rEnh/aRgLyz2tso1m38fExm9qx4w+S33n66amN1ZUfLi8vjyORJMuyiTzPUzhY2b9//8twRs+4i/EA2A/wEPEoT4CAfHcUDTcxOCLWXr+fY0PCDfxQj59+v5djB+5WKtV0q7XVFp0KSIAw3AXxgd35+fm9Cwvzv4dLUsINrtfrrTUbzWJqavKN24/e8dT/AxnuSvOufIunAAAAAElFTkSuQmCC';
}
