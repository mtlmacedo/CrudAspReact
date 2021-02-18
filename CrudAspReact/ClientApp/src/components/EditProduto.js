import React, { Component } from 'react';

export class Produto {
    constructor() {
        this.id = 0;
        this.valor = "";
        this.data = Date;
    }
}

export class AddProduto extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", produto: new Produto(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async intialize() {
        var id = this.props.match.params.id;
        const response = await fetch('api/Produtos/' + id);
        const data = await response.json();
        this.setState({ title: "Edit", produto: data, loading: false });
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

        const response1 = fetch('api/Produtos/' + this.state.produto.id, { method: 'PUT', body: data });
        this.props.history.push('/produto');
        
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/produto');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form row">
                    <input type="hidden" name="id" value={this.state.produto.id} />
                </div>
                <div className="form row">
                    <div className="col-md-6">
                        <text>Valor:</text>
                        <input className="form-control" type="text" name="Valor" defaultValue={this.state.produto.valor} required />
                    </div>
                </div>
                <div className="form row">
                    <div className="col-md-6">
                        <text>Data:</text>
                        <input className="form-control" type="text" name="Data" defaultValue={this.state.produto.data} required />
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


