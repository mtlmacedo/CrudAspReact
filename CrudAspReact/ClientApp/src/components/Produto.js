import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class Produto extends Component {
    static displayName = "Produtos";

    constructor() {
        super();
        this.state = { Produto: [], loading: true };
        this.reload = this.reload.bind(this)
    }

    componentDidMount() {
        this.populaProdutoData();
    }

    static handleEdit(id) {
        window.location.href = "/add-produto/" + id;
    }

    reload() {
        fetch('api/Produtos')
            .then(response => response.json())
            .then(data => this.setState({ Produto: data, loading: false }));
    }

    static handleDelete(id) {
        //var data = event.target;
        if (!window.confirm("Você deseja deletar o produto : " + id)) {
            return;
        }
        else {
            fetch('api/Produtos/' + id, { method: 'delete' })
                .then(json => {
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderProdutoTabela(Produto) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Produto.map(a =>
                        <tr key={a.id}>
                            <td>{a.nome}</td>
                            <td>{a.valor}</td>
                            <td>{this.formatData(a.data)}</td>
                            <td>
                                <button className="btn btn-success" onClick={(event) => this.handleEdit(a.id)}>Editar</button>
                                <button className="btn btn-danger" onClick={(event) => { this.handleDelete(a.id) }}>Deletar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static formatData(d) {
        return d.substring(8, 10) + '/' + d.substring(5, 7) + '/' + d.substring(4, 0);
    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em> </p>
            : Produto.renderProdutoTabela(this.state.Produto);

        return (
            <div>
                <h1 id="tabelLabel" >Produtos</h1>
                <p>Tela de Listagem de Produtos</p>
                <p>
                    <Link className="btn" to="/add-produto">Cadastrar Produtos</Link>
                </p>
                {contents}
            </div>
        );
    }

    populaProdutoData() {
        fetch('api/Produtos')
            .then(response => response.json())
            .then(data => this.setState({ Produto: data, loading: false }));
    }
}