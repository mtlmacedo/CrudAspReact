import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class Crud extends Component {
    static displayName = "Alunos";

    constructor() {
        super();
        this.state = { Alunos: [], loading: true }
    }

    componentDidMount() {
        this.populaAlunoData();
    }

    static handleEdit(id) {
        window.location.href = "/aluno/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o aluno : " + id)) {
            return;
        }
        else {
            fetch('api/Alunos/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "Crud";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderAlunosTabela(Alunos) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Alunos.map(a =>
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.nome}</td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(a.id)}>Edit</button> &nbsp;
                                  <button className="btn btn-danger" onClick={(id) => this.handleDelete(a.id)}>Delete</button>
                            </td>

                        </tr>

                    )}
                </tbody>
            </table>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em> </p>
            : Crud.renderAlunosTabela(this.state.Alunos);

        return (
            <div>
                <h1 id="tabelLabel" >Alunos</h1>
                <p>Tela de Listagem de Alunos</p>
                <p>
                    <Link to="/add-aluno">Cadastrar Aluno</Link>
                </p>
                {contents}
            </div>
        );
    }


    async populaAlunoData() {
        const response = await fetch('api/Alunos');
        const data = await response.json();
        this.setState({ Alunos: data, loading: false });
    }

}