/**
 * Função que converte uma string em elementos de um array
 */

module.exports = (arrayAsString) => {
    return  arrayAsString.split(',').map(tech => tech.trim()) //trim: remove espaços antes e depois de uma string
}