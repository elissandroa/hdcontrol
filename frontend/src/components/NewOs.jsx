export const NewOs = ({ clients, products }) => {
    return (
        <div>
            <form>
                <div>
                    <div>
                        <label htmlFor="cliente">Cliente:</label>
                    </div>
                    <div>
                        <select name="Client" id="client">
                            <option value="select">Selecione um Cliente</option>
                            {
                                clients && clients.map((client) => (
                                    <option>{client.id}-{client.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantidade</label>
                    </div>
                    <div>
                        <input type="number" name="quantity" />
                    </div>
                    <div>
                        <label htmlFor="product">Descrição</label>
                    </div>
                    <div>
                        <select name="product" id="product">
                            <option value="selectProduct">Selecione um produto</option>
                            {
                                products && products.map((prod) => (
                                    <option>{prod.description}</option>
                                ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}
