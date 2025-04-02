/*
  📦 Dependy the Importer  
  Zaimportuj wszystkie wymagane moduły: path, express, body-parser, logger oraz routing.  
*/
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")
const config = require("./config");
const {getErrorLog,getInfoLog,getProcessLog} = require("./utils/logger")
const productRouting = require("./routing/product")
const logoutRoutes = require("./routing/logout")
const killRouter = require("./routing/kill")
const homeRoutes = require("./routing/home")
const {STATUS_CODE} = require("./constants/statusCode")
const {PORT} = require("./config")



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next)=>{
  getInfoLog(req.url, req.url);
  next();
})

app.use('/product', productRouting);
app.use('/logout', logoutRoutes);
app.use('/kill', killRouter);
app.use('/', homeRoutes);
app.use((req, res) => {
  getErrorLog(req.url);
  res.status(STATUS_CODE.NOT_FOUND).sendFile(path.join(__dirname, 'views', '404.html'));
});
app.listen(PORT, () => {
  getProcessLog(`Serwer nasłuchuje na porcie ${PORT}`);
});
/*
  🏗 Structo the Builder  
  Utwórz instancję aplikacji express i zapisz ją w stałej app.  
*/
/*
  🏗 Structo the Builder  
  Zarejestruj middleware body-parser do parsowania ciał formularzy. 
*/
/*
  🏗 Structo the Builder  
  Dodaj middleware logujący informacje o każdym przychodzącym żądaniu.  
*/
/*
  🏗 Structo the Builder  
  Zarejestruj middleware obsługujące poszczególne ścieżki.  
*/
/*
  🏗 Structo the Builder  
    Obsłuż stronę 404 – zwróć plik 404.html i zaloguj błąd.   
*/
/*
  🏗 Structo the Builder  
    Uruchom serwer i nasłuchuj na porcie z config.js.    
*/