import { random } from './util';
import _ from 'lodash';
import $ from 'jquery'

const rOne = random(10);
const rTwo = random(20);

console.log(`${rOne} ${rTwo}`);

function component(){
  //alert('test');
  let element = document.createElement('div');
  
  /* lodash */
  element.innerHTML = _.join(['Hello', 'gulp'], ' '); //lodash는 명시적으로 _로 바인딩한다.
  return element;
}


document.body.appendChild(component());

$(function(){
  alert('hello');
});