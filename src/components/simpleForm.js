import React from 'react';
import Translator from '../components/i18n/Translator';

class SimpleForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dateWork: '',
        workToday: true,
        message: "",
        showDiv: false
      };
      
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      });
    }

    isEven (number) {
      return number % 2 === 0 ? true : false;
    }

    dateParser(date) {
      let newDate = date.split('-');
      return newDate[2];
    }
  
    handleSubmit(event) {
      
      let dayInputed = this.dateParser(this.state.dateWork)
      let inputedDateisEven = this.isEven(dayInputed)
      let todayDateisEven = this.isEven(new Date().getDate())
      let message = ''
      let workToday = this.state.workToday == 'true'

      if ((todayDateisEven && workToday) ||(!todayDateisEven && !workToday)) {
        if (inputedDateisEven) {
          message = <Translator path="home.response1"/>
        } else {
          message = <Translator path="home.response2"/>
        }
      } else{
        if (inputedDateisEven) {
          message = <Translator path="home.response2"/>
        } else {
          message = <Translator path="home.response1"/>
        }
      }
      this.setState({
        message: message,
        showDiv: true
      });
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)} className='max-w-2xl bg-white py-10 px-5 m-auto w-full mt-10'>

          <div className="text-3xl mb-6 text-center ">
            <Translator path="home.title"/>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

            <div className="col-span-2 lg:col-span-1">
              <input required type="date" value={this.state.dateWork} onChange={this.handleInputChange} name="dateWork" id="date-work" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full" placeholder="Qual a Data"/>
            </div>

            <div className="col-span-2" onChange={this.handleInputChange}>
              <label className="text-1xl font-medium"><Translator path="home.question"/></label>
              <div className="flex items-center mb-4 mt-4">
                <input id="default-radio-1" type="radio" value="true" name="workToday" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><Translator path="home.yes"/></label>
              </div>
              <div className="flex items-center">
                <input id="default-radio-2" type="radio" value="false" name="workToday" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><Translator path="home.no"/></label>
              </div>
            </div>

            <div className="col-span-2 text-right">
              <button className="py-3 px-6 bg-green-500 text-white font-bold w-full sm:w-32">
                <Translator path="home.send"/>
              </button>
            </div>
            {
              this.state.showDiv &&

            <div className="col-span-2 text-right">
              <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">{this.state.message}!</span>
                </div>
              </div>
            </div>
            }
          </div>
        </form>
        
      );
    }
  }
  export default SimpleForm;
