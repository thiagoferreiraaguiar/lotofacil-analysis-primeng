export class Util {

    public showLabelPaginate(page: number, totalResgistros: number, qtdRows: number): string {
        var firstPage = 0;
        var endPage = 0;
        var quociente = 0;
        var paginaAtual = page + 1;
        var text = "";

        if (totalResgistros == 0) {
            text = "Nenhum registro encontrado."
        } else {
            if (totalResgistros <= qtdRows) {
                firstPage = 1;
                endPage = totalResgistros;
            } else {
                firstPage = (qtdRows * paginaAtual);
                quociente = (totalResgistros / qtdRows);
                if (parseInt(quociente.toString()) > paginaAtual) {
                    endPage = qtdRows * (paginaAtual + 1);
                } else {
                    endPage = totalResgistros;
                }
            }
            text = "Exibindo " + firstPage + " até " + endPage + " de " + totalResgistros;
        }

        return text;
    }


}
