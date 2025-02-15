export const DateToString = (date: string) => {
    const data = new Date(date);

    // Extrai o dia, mês e ano
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0'); // getMonth() retorna de 0 a 11
    const year = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    // Retorna a data formatada no formato DD/MM/YYYY
    return `${day}/${month}/${year} ${horas}:${minutos}`;
}