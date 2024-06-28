import tw from "twin.macro";
import useProductList from "../../hooks/ProductListHook/ProductListHook";

const ProductListComponent = () => {
    const { Products, loading, error, searchTerm, setSearchTerm, handleSearch } = useProductList();

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
                        <th tw="border px-4 py-2">Marca</th>
                        <th tw="border px-4 py-2">Precio</th>
                        <th tw="border px-4 py-2">Imagen</th>
                        <th tw="border px-4 py-2">Categoría</th>
                        <th tw="border px-4 py-2">Subcategoría</th>
                        <th tw="border px-4 py-2">Estado</th>
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
                            <td tw="border px-4 py-2">
                                <img src={product.image} alt={product.name} tw="w-16 h-16 object-cover" />
                            </td>
                            <td tw="border px-4 py-2">{product.categoryId}</td>
                            <td tw="border px-4 py-2">{product.subCategoryId}</td>
                            <td tw="border px-4 py-2">{product.status}</td>
                            <td tw="border px-4 py-2">
                                <button tw="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-700">Eliminar</button>
                                <button tw="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700">Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListComponent;
