import React, { Component } from 'react';


export class Produto {
    constructor() {
       
    }
}


export class AddProduto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            id: 0,
            nome: "",
            valor: "",
            data: "",
            loading: true
        };
        this.intialize();
        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeValor = this.handleChangeValor.bind(this);
    }

    intialize() {
        var id = this.props.match.params.id;
        if (id > 0) {
            fetch('api/Produtos/' + id)
                .then(response => response.json())
                .then(value => this.setState({
                    title: "Edit",
                    id: id,
                    nome: value.nome,
                    valor: value.valor,
                    data: value.data,
                    loading: false
                }));
        }
        else  {
            this.state = {
                title: "Create",
                id: 0,
                nome: "",
                valor: "",
                data: "",
                loading: false
            };
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

        if (this.state.id) {
            fetch('api/Produtos/' + this.state.id, { method: 'PUT', body: data });
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

    handleChangeValor(event) {
        const valorFormatado = (event.target.validity.valid) ? event.target.value : this.state.valor;
        this.setState({ valor: valorFormatado })
    };


    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form row">
                    <input type="hidden" name="id" value={this.state.id} />
                </div>
                <div className="form row">
                    <div className="col-md-3">
                        <text>Nome:</text>
                        <input className="form-control" type="text" name="Nome" defaultValue={this.state.nome} required />
                    </div>
                </div>
                <div className="form row">
                    <div className="col-md-3">
                        <text>Valor:</text>
                        <input className="form-control" type="text" name="Valor" pattern="[0-9]*" value={this.state.valor} onChange={this.handleChangeValor} required />
                    </div>
                </div>
                <div className="form row">
                    <div className="col-md-3">
                        <text>Data:</text>
                        <input className="form-control" type="date" name="Data" defaultValue={this.state.data != null && this.state.data != undefined ? this.state.data.substring(0, 10) : null} required />
                    </div>
                </div>

                <div className="form button">
                    <button type="submit" className="btn btn-success" value={this.state.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cancelar</button>
                </div>
            </form>
        );

    }
}


