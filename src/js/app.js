import { i18n } from "./data/i18n"

export default () => {
    return {
        conf: { // set conf values here
            locale: document.querySelector('html').getAttribute('lang') // get lang attribute from html tag
        },
        data: { // set some data here 
            hello: '',
            i18n: {}
        },
        init() { // this is executed first
            this.helloWorld()
        },
        helloWorld() {
            this.data.hello = 'Hello world !'
            this.data.i18n = i18n[this.conf.locale]
        }
    }
}
