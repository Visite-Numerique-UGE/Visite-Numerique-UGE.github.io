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
            quiz: {},
            id_parcours: 4,
            step: 0,
        },
        _quiz: _quiz_,
        _data: _data_,
        init() { // this is executed first
            this.helloWorld()
            this.initVar()
        },
        helloWorld() {
            this.data.hello = 'Hello world !'
            this.data.i18n = i18n[this.conf.locale]
        }, initVar() {

            this.data.quiz = this._quiz.getDataQuiz()
            console.log(this.data.quiz)
        }
    }
}
