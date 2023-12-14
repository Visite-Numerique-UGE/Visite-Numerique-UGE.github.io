import { i18n } from "./data/i18n"
import * as _quiz_ from "./data/quiz.js"
import * as _data_ from "./data/data.js"
export default () => {
    return {
        conf: { // set conf values here
            locale: document.querySelector('html').getAttribute('lang') // get lang attribute from html tag
        },
        data: { // set some data here 
            hello: '',
            i18n: {},
        },
        _quiz: _quiz_,
        _data: _data_,
        init() { // this is executed first
            //this.helloWorld()

        },
        helloWorld() {
            this.data.hello = 'Hello world !'
            this.data.i18n = i18n[this.conf.locale]
        }, page(id_parcours, step, state) {

            _data_.save("state", state)
            _quiz_.map(state);
            _quiz_.question(id_parcours, step, state)
            _quiz_.answer(id_parcours, step, state)
            _quiz_.endPage(id_parcours, state)

        }
    }
}
