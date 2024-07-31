import './Os.css'
import { products } from '../mockDatabase/products'
import { clients } from '../mockDatabase/clients'
import { NewOs } from '../components/NewOs'


export const Os = () => {
    return (
        <div className='os-container'>
            <h2>Ordem de Serviço</h2>
            <NewOs clients={clients} products={products} />
        </div>
    )
}
