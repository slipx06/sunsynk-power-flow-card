import {
	InverterSettingsDto,
	InverterStatus,
} from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class Growatt extends InverterSettingsDto {
	brand = InverterModel.Growatt;
	statusGroups: InverterStatus = {
		standby: {
			states: ['0', 'standby', 'stand-by'],
			color: 'blue',
			message: localize('common.standby'),
		},
		selftest: {
			states: ['selftest', 'self-checking'],
			color: 'yellow',
			message: localize('common.selftest'),
		},
		normal: {
			states: ['1', 'normal', 'ok'],
			color: 'green',
			message: localize('common.normal'),
		},
		alarm: {
			states: ['alarm'],
			color: 'orange',
			message: localize('common.alarm'),
		},
		fault: {
			states: ['3', 'fault'],
			color: 'red',
			message: localize('common.fault'),
		},
	};
	image =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAABICAYAAABWWr1vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAX2SURBVGhD7VtNbxtFGH527fXH2rFdu3GTuEkhaYIJDS1QgaCqgAPQCpVDT5y4VeJSLtyQOMEB8RM4FKlUnHpoQqUeSi4I9VSaUqmqmkq0KS3pB47z5Y+1d9e879irOFYavE4aj6M86Wh3xrvuPPM+77OzmYkCwtzc3Mflcvm7SqXyChXR5kBRFHi9XnFuWRYqFVDdI+qbiVKphPPnz+PixYtQVbXWCpRLZdgVG4FAgP7viriO+1EPTdPQ39//8KNjx7795MSJH5RMJvMBXThOnwWrl7QHuVwOZ8+exYULFwQpHky38Pn99henT59WKUJfU72thBgVmyTAR4qGU9yiZBjq5cu/fqPSzQdrbW0FS6yRSCvEZmbuRVi8m58gmwi3xGzbxkpGbiNIRaoVua0FaUgxoVYcby3sRKpdcEtWPlLU/3C/hcTBEk1nqs8rdjQ+Vsj2+by+OIT53IEyOzu7TMdQtdo+LCws4NxP5zDxyzj6jpgoLynQrR6ceP9TLC4tYZE+7+rqQjQaFdMk07Tg8VRjMjk5iWPHj+PHM2d4ymRKR2p8fAJ7DpsIJCgC/8YQKg4IMpFIFE+fPkEsFhPzP6NoQPNpRM7E1NQUDh46hD+uXkUikZCQ1MQ4VIUiUHNCxxCbdcZIJGLKaRTUf+bQqsN3hPu5xQ6p5w0y7aZzZz1IRUqhn82YVUgXKQeN5NyQlTanGmXoRpY7RtEpkM4onoWOzan1jKJjc6o+Uht5XkkbqY1A2kht5CEsFanNgrTy2zY5tZ78mpUjD0bHGMW2nCZ17MN3Pew8fGtHKcA55ZBp1SgY0snP6XxjpLalUbgBk2pdvJKCSTUv1i3EtsopBxvNKWnkt2LptajQwfavLNGIum+lzivwa0VFqkixpbPMentTiMfjeGkkjehrUQzsHRDtwWAQ0VcjrEVxfbq3D/u6u8VKSCy2S6yOMKSUn2EUMT8/j4XlBQT/0lEyywiFuxDUQ9D/DiPUFRH1LEky7/GiUCiKZR5dr+5xkYoUy48jwvkToKgcSMdx9E0do6MpDA6lcfStKN49HMTY2CjGDryII2948fpYDMnewVVGIpf8aoQcPFrUMdX1DrJzQNAs4cHdOH6//hkwn6do+jBTGMbj5GEaCqN2RxVyRYoI1Y+4YlIeTd9BRQ/ACgZghoPQ9ijIeX2w7Ar8TzLYe+MG37hqMKQzilXW7VGQSafh50VqRUU4HkT6QwOhaBh6SIcSiyBTNqEbhrzyY3DnRAfp3+CeBbyd/Q37krNYLPiQ1O4gNPUzYObI25fRG3+A7n4DFi+n1oHXfOkK6NVq+8Brvrzfb2JiAt1k09lsFprmZWUJ2Da9pqvVaDj7LHmvI/O3LFssbqdSfSgWDbnWfB33Y/CxTNJSVC/lDwWHbN00ufMmwuEwfVYmsygT2eo+i3rIJb+6dGJwZ1OpFBLxBEKhEPr6+kQbbz3l4/79Q/B4Vnb21cZDMlLUKTYKLjxL4BnEn9ev4/79GXq4PsXt27fFvonp6WlB6tq1KZJbQVzLkmUJM6Qi5bhfJpMRM4pcPoeBgQHeG4FoNILdu3eL6dPw8DCSySRGRkawa1dc5B8Xg1yQIVekGsCbRDh3OL843/ic84w7zyVfKIjjqscAQTqjqAd3dnl5WZApUWHpOfPCfD6PpcVFkl+xdvUKpJNfPRojwPXGtrWgEnubPb7dRWyqb7DmVsCkVa/Xq/p8PrS78I6w+r8caBWcf1IbRT2akR1DRKp2/tzhzBSeN7Y0Us2O9LPQ7KBsaaS2EtKSaoysm0hLS2ojObgjv61EvdzcmkxHRMqtFJlUoXoqL9xEyu/3qyrNtyZr9baCO+5WZo3giA4ODd3iCe1XlmXfrbW3Ha0S48kwvVBmT548+bn4hps3b/aHw+EvaUL5nmVZL9P7i09R1CWfT3sk7nAB7hSPWC6X20vfxb/cNunN9R61eendJ0nfHaA2VdO0JTp6dF1/yNfz+9GlS5dw5coV+or/J0Z99VB5ge7NUvWfnp6eq6dOnfp+dHT01n+fEhnDXCZ6MAAAAABJRU5ErkJggg==';
}
