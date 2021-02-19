import React, { Component } from 'react';

export class Produto {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.valor = "";
        this.data = "";
    }
}

export class AddProduto extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", produto: new Produto(), loading: true };
        this.intialize();       
        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    intialize () {
        var id = this.props.match.params.id;
        if (id > 0) {
            fetch('api/Produtos/' + id)
                .then(response => response.json())
                .then(data => this.setState({ title: "Edit", produto: data, loading: false }));             
        }
        else if (id == null || id == undefined) {
            this.state = { title: "Create", produto: new Produto(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Produto</h3>
                {contents}
            </div>
        );
    }

    handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.produto.id) {
            fetch('api/Produtos/' + this.state.produto.id, { method: 'PUT', body: data });
            this.props.history.push('/produto');
        }
        else {
            fetch('api/Produtos/', { method: 'POST', body: data });
            this.props.history.push('/produto');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/produto');
    }

    handleChange(event) {
        const num = /^[0-9,\b]+$/;

        if (event != undefined && event != null && !num.test(event.target.value)) {
            var value = event.target.value;
            event.target.value = value.slice(0, -1);
        }
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form row">
                    <input type="hidden" name="id" value={this.state.produto.id} />
                </div>
                <div className="form row">
                    <div className="col-md-3">
                        <text>Nome:</text>
                        <input className="form-control" type="text" name="Nome" defaultValue={this.state.produto.nome} required />
                    </div>
                </div>
                <div className="form row">
                    <div className="col-md-3">
                        <text>Valor:</text>
                        <input className="form-control" type="text" name="Valor" onChange={this.handleChange} defaultValue={this.state.produto.valor} required />
                    </div>
                </div>
                <div className="form row">
                    <div className="col-md-3">
                        <text>Data:</text>
                        <input className="form-control" type="date" name="Data" defaultValue={this.state.produto.data.substring(0, 10)} required />
                    </div>
                </div>

                <div className="form button">
                    <button type="submit" className="btn btn-success" value={this.state.produto.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>

        );
    }

}


