import tw from "twin.macro";
import useProductList from "../../hooks/ProductListHook/ProductListHook";
import { CreateProductModal } from "../ModalProduct/CreateProductModal";

const ProductListComponent = () => {
    const { Products, loading, error, searchTerm, setSearchTerm, handleSearch, handleCreateProduct, closeModal, openModal, isModelOpen} = useProductList();

    if (loading) return <div tw="text-center mt-4">Cargando...</div>;
    if (error) return <div tw="text-center mt-4 text-red-500">Error: {error}</div>;

    return (
        <div tw="container mx-auto p-4">
            <div tw="flex justify-between mb-4">
                <h2 tw="text-xl font-semibold mb-4">Lista de Productos</h2>
                <button onClick={openModal} tw="px-2 py-1 rounded-md bg-[#0568a6] text-white">Agregar producto</button>
            </div>
            <CreateProductModal isModalOpen={isModelOpen} onClose={closeModal} />
            <div tw="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    tw="border rounded px-4 py-2 flex-grow"
                />
                <button
                    onClick={() => handleSearch(searchTerm)}
                    tw="bg-[#0568a6] text-white px-4 py-2 rounded-r hover:bg-blue-700"
                >
                    Buscar
                </button>
            </div>
            <div tw="overflow-x-auto">
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
                            <tr key={product._id}>
                                <td tw="border px-4 py-2">{product.name}</td>
                                <td tw="border px-4 py-2">{product.description}</td>
                                <td tw="border px-4 py-2">{product.brand}</td>
                                <td tw="border px-4 py-2">${product.price}</td>
                                <td tw="border px-4 py-2">
                                    <img src={product.image} alt={product.name} tw="w-24 h-16 object-cover" />
                                </td>
                                <td tw="border px-4 py-2">{product.categoryId?.category}</td>
                                <td tw="border px-4 py-2">{product.subCategoryId?.subcategory}</td>
                                <td tw="border px-4 py-2">
                                    <span tw="bg-[#0568a6] text-white rounded-md px-2 py-1 text-xs">
                                        {product.status}
                                    </span>
                                </td>
                                <td tw="border px-4 py-2">
                                    <button tw="bg-[#077F8C] text-white px-2 py-1 rounded mb-2 w-full">
                                        Actualizar
                                    </button>
                                    <button tw="bg-[#065473] text-white px-2 py-1 rounded w-full">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductListComponent;
