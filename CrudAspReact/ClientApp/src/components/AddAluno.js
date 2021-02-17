import React, { Component } from 'react';

export class Aluno {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.matricula = "";
    }
}

export class AddAluno extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", aluno: new Aluno(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async intialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Alunos/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", aluno: data, loading: false });
        }
        else {
            this.state = { title: "Create", aluno: new Aluno(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Aluno</h3>
                {contents}
            </div>
        );
    }


    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.aluno.id) {
            const response1 = fetch('api/Alunos/' + this.state.aluno.id, { method: 'PUT', body: data });
            this.props.history.push('/Crud');
        }
        else {
            const response2 = fetch('api/Alunos/', { method: 'POST', body: data });
            this.props.history.push('/Crud');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/Crud');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form row">
                    <input type="hidden" name="id" value={this.state.aluno.id} />
                </div>
                <div className="form row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="Nome" defaultValue={this.state.aluno.nome} required />
                    </div>
                </div>
                <div className="form row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="Matricula" defaultValue={this.state.aluno.matricula} required />
                    </div>
                </div>

                <div className="form button">
                    <button type="submit" className="btn btn-success" value={this.state.aluno.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cencelar</button>
                </div>
            </form>

        );
    }

}


