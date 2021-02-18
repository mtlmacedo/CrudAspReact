import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { AddProduto } from "./AddProduto";

export class Produto extends Component {
    static displayName = "Produtos";

    constructor() {
        super();
        this.state = { Produto: [], loading: true }
    }

    componentDidMount() {
        this.populaProdutoData();
    }

    static handleEdit(id) {
        window.location.href = "/add-produto/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o produto : " + id)) {
            return;
        }
        else {
            fetch('api/Produtos/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "/produto";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderProdutoTabela(Produto) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Produto.map(a =>
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.nome}</td>
                            <td>{a.valor}</td>
                            <td>{this.formatData(a.data)}</td>
                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(a.id)}>Edit</button>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(a.id)}>Delete</button>
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
                    <Link to="/add-produto">Cadastrar Produtos</Link>
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