import tw from "twin.macro";
import userProductList from "../../hooks/ProductListHook/ProductListHook";

const ProductListComponent = () => {
    const { Products, loading, error, searchTerm, setSearchTerm, handleSearch } = userProductList();

    if (loading) return <div tw="text-center mt-4">Cargando...</div>;
    if (error) return <div tw="text-center mt-4 text-red-500">Error: {error}</div>;

    return (
        <div tw="container mx-auto p-4">
            <h2 tw="text-xl font-semibold mb-4">Lista de Productos</h2>
            <div tw="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                    tw="border rounded-l px-4 py-2 flex-grow"
                />
                <button
                    onClick={() => handleSearch(searchTerm)}
                    tw="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                >
                    Buscar
                </button>
            </div>
            <table tw="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th tw="border px-4 py-2">Nombre</th>
                        <th tw="border px-4 py-2">Descripción</th>
                        <th tw="border px-4 py-2">brand</th>
                        <th tw="border px-4 py-2">precio</th>
                        <th tw="border px-4 py-2">imagen</th>
                        <th tw="border px-4 py-2">Categoria</th>
                        <th tw="border px-4 py-2">Sub categoria</th>
                        <th tw="border px-4 py-2">Status</th>
                        <th tw="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Products.map((product) => (
                        <tr key={product._id} tw="hover:bg-gray-100">
                            <td tw="border px-4 py-2">{product.name}</td>
                            <td tw="border px-4 py-2">{product.description}</td>
                            <td tw="border px-4 py-2">{product.brand}</td>
                            <td tw="border px-4 py-2">{product.price}</td>
                            <td tw="border px-4 py-2">{product.image}</td>
                            <td tw="border px-4 py-2">{product.CategoryId}</td>
                            <td tw="border px-4 py-2">{product.subCategoryId}</td>
                            <td tw="border px-4 py-2">{product.status}</td>
                            <td tw="border px-4 py-2"><button>eliminar</button><button>actualizar</button></td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListComponent;

