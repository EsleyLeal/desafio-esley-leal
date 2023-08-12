class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduiche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };

        this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;

        for (const item of itens) {
            const [codigoItem, quantidade] = item.split(',');
            const itemInfo = this.cardapio[codigoItem];

            if (!this.cardapio.hasOwnProperty(codigoItem)) {
                return "Item inválido!";
            }

            if (quantidade < 1) {
                return "Quantidade inválida!";
            }

            total += itemInfo.valor * quantidade;

            if (itemInfo.descricao.includes("extra") && !itens.includes(itemInfo.descricao.split(" ")[0])) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (metodoDePagamento === "dinheiro") {
            total *= 0.95; // Aplicar 5% de desconto
        } else if (metodoDePagamento === "credito") {
            total *= 1.03; // Aplicar 3% de acréscimo
        }

        return `Total a pagar: R$ ${total.toFixed(2)}`;
    }
}

export { CaixaDaLanchonete };
