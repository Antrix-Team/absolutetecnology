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
                        <th tw="border px-4 py-2 ">Nombre</th>
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
                        <tr key={product._id}>
                            <td tw="border px-4 py-2">{product.name}</td>
                            <td tw="border px-4 py-2">{product.description}</td>
                            <td tw="border px-4 py-2">{product.brand}</td>
                            <td tw="border px-4 py-2">${product.price}</td>
                            <td tw="border px-4 py-2">
                                <img src={product.image} alt={product.name} tw="w-16 h-16 object-cover" />
                            </td>
                            <td tw="border px-4 py-2">{product.categoryId ? product.categoryId.category : "Sin categoría"}</td>
                            <td tw="border px-4 py-2">{product.subCategoryId ? product.subCategoryId.subcategory : "Sin subcategoría"}</td>
                            <td tw="border px-4 py-2"><span tw="border-transparent bg-[#0568a6] text-white rounded-md inline-block w-auto px-2 py-1 text-xs text-center">{product.status}</span></td>
                            <td tw="border px-4 py-2 " className="items">
                                <button className="items" tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 w-full ">Actualizar</button>
                                <button className="items" tw="bg-[#065473] text-white px-2 py-1 rounded mr-2 w-full">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListComponent;
