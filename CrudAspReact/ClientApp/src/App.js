import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Alunos } from './components/Alunos';
import { AddAluno } from './components/AddAluno'
import { Home } from './components/Home'
import './custom.css'
import { AddProduto } from './components/AddProduto';
import { Produto } from './components/Produto';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/alunos' component={Alunos} />
            <Route path='/add-aluno/:id?' component={AddAluno} />
            <Route path='/produto' component={Produto} />
            <Route path='/add-produto/:id?' component={AddProduto} />           
      </Layout>
    );
  }
}
