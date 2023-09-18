export function stockToner(){
    console.log("stock de toners")

    const stock = [
        {id:1, toner:'32A', stock:10},
        {id:2, toner:'32A', stock:10},
        {id:3, toner:'32A', stock:10},
        {id:4, toner:'32A', stock:10},
        {id:5, toner:'32A', stock:10},
        {id:6, toner:'32A', stock:10},
        {id:7, toner:'32A', stock:10},
        {id:8, toner:'32A', stock:10},
        {id:9, toner:'32A', stock:10},
        {id:10, toner:'32A', stock:10},
        {id:11, toner:'32A', stock:10},
        {id:12, toner:'32A', stock:10},
        {id:13, toner:'32A', stock:10},
        {id:14, toner:'32A', stock:10},
        {id:15, toner:'32A', stock:10},
        {id:16, toner:'32A', stock:10},
        {id:17, toner:'32A', stock:10},
        {id:18, toner:'32A', stock:10},
        {id:19, toner:'32A', stock:10},
    ]

    const tableContainer = document.getElementById('table-container');

    let tableHTML = 
    `
    <table>
            <thead>
                <tr>
                    <th>Toner</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (const toner of stock) {
        tableHTML += `
            <tr>
                <td>${toner.toner}</td>
                <td>${toner.stock}</td>
            </tr>
        `;
    }
    tableHTML += `
            </tbody>
        </table>
    `;
    tableContainer.innerHTML = tableHTML;
}