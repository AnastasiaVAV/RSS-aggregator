import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

const appDiv = document.getElementById('app')

const form = document.createElement('form')
form.innerHTML = `
  <form action="" class="rss-form text-body">
    <div class="row">
      <div class="col">
        <div class="form-floating">
          <input id="url-input" autofocus type="text" required name="url" aria-label="url"
            class="form-control w-100" placeholder="ссылка RSS" autocomplete="off">
          <label for="url-input">Ссылка RSS</label>
        </div>
      </div>
      <div class="col-auto">
        <button type="submit" aria-label="add" class="h-100 btn btn-lg btn-primary px-sm-5">Добавить</button>
      </div>
    </div>
  </form>
`

appDiv.append(form)
