// BIBLIOTECA &#x1f847;
const express = require('express');
const sqlite = require('sqlite3').verbose();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const bodyParser = require('body-parser');
//const ejs = require('ejs');
// BIBLIOTECA &#x1f845;



// VARIAVEIS &#x1f847;
const app = express();
const ejs = require('ejs');
const db = new sqlite.Database('Database.db');
const chave_secreta = 'vtjpk';
// VARIAVEIS &#x1f845;



// MIDDLEWARE &#x1f847;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(bodyParser.json());
// MIDDLEWARE &#x1f845;


//-----------------------------------


app.get('/', (req, res) => {
  res.render('registro', {});
});


//-----------------------------------


app.post('/validacao', (req, res) => {
  
console.log(req.body);
  
res.cookie('dados', req.body, { maxAge: 900000, httpOnly: true });
res.send('1');

});


//-----------------------------------


app.get('/css', (req, res) => {
  res.sendFile(__dirname + '/src/style.css');
});


//-----------------------------------------


app.get('/escolha', (req, res) => {
  var dados = req.cookies.dados;
  res.render('escolha', dados);
});


//-----------------------------------------


app.get('/comando', (req, res) => {
  res.render('comando', {});
});


//-----------------------------------------


app.post('/enviar_comando', (req, res) => {


  db.run('INSERT INTO DADOS ( IP, DATA, CONTEUDO, STATUS, NOME , MAQUINA ) values (?, ?, ?, ?, ?, ? )', [req.ip, req.cookies.dados.Data, req.body.CONTEUDO, '1', req.cookies.dados.Nome, req.body.MAQUINA], function(err) {

    if (err) console.error(err);
    else res.send('https://ct-avaliacoes.gabrielfarias23.repl.co/');
  });

});


//----------------------------------------


app.get('/analise', (req , res) => {
  res.render('analise', {});
});


//----------------------------------------


app.get('/check', (req, res) => {

  const sql = 'SELECT * FROM DADOS';

  db.all(sql, (err, rows) => {
    if (err) console.log(err);
    else {
      console.log(rows)
      res.json(rows);
    }
  });

});


//---------------------------------------------


function Criar_tabela() {
  const sql = `CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, Nome VARCHAR(100), Unidade VARCHAR(100), dados VARCHAR(100) );`;

  db.run(sql, (err) => {
    if (err) console.log(err);
    else console.log('tabela usuarios feita');
  });
}
//Criar_tabela()

//---------------------------------------------------------------------------


function Criar_VITOR() {
  const sql = 'CREATE TABLE DADOS ( ID INTEGER PRIMARY KEY AUTOINCREMENT, IP VARCHAR(50), DATA VARCHAR(50), CONTEUDO TEXT, STATUS VARCHAR(3), NOME VARCHAR(100), DADOS VARCHAR(10) , MAQUINA VARCHAR(100) );';

  db.run(sql, (err) => {
    if (err) console.log(err);
    else console.log('tabela DADOS feita');
  });
}
//Criar_VITOR()
//---------------------------------------------------------------------------
function Criar_tabela2() {
  const sql = `CREATE TABLE DADOS1 (id INTEGER PRIMARY KEY AUTOINCREMENT,  DADOS VARCHAR(5000) , MAQUINA VARCHAR(5000));`;

  db.run(sql, (err) => {
    if (err) console.log(err);
    else console.log('tabela DADOS1 feita');
  });
}
//Criar_tabela2()
//---------------------------------------------------------------------------
function InsertLogin(param1, param2) {

  let sql = 'INSERT INTO usuarios (Nome , Unidade , dados) VALUES ("' + param1 + '", "' + param2 + '")'

  db.run(sql, (err) => {
    if (err) console.log(err);
    else console.log('Tu fez o registro meu bom!');
  });

};
//---------------------------------------------------------------------------
function Select_all_login() {

  const sql = 'SELECT * FROM DADOS';

  db.all(sql, (err, rows) => {
    if (err) console.log(err);
    else console.log(rows);
  });
}


//---------------------------------------------------------------------------


function DeleteTable() {

  const sql = 'DROP TABLE DADOS1'

  db.run(sql, (err) => {
    if (err) console.log(err);
    else console.log('Tá apagado meu nobre');
  });
}
//DeleteTable()

app.listen(3000);
