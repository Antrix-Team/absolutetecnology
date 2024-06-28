import tw from "twin.macro";
import { IoMdClose } from "react-icons/io";

export const CreateProductModal = ({isModalOpen, onClose}) => {
  if(isModalOpen !== true) return null;
  return (
    <div tw="fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0, 0, 0, 0.8)] flex flex-col items-center justify-center">
      <form tw="w-1/2 border-2 border-transparent rounded-md bg-white h-auto px-4 py-6">
        <h2 tw="text-center text-2xl">Crear producto</h2>
        <div tw="w-full my-3">
          <input type="text" required placeholder="Nombre del producto" tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3">
          <input type="text" required placeholder="Descripción del producto" tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3">
          <input type="text" required placeholder="Marca del producto" tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3">
          <input type="text" required placeholder="Precio del producto" tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3" />
        </div>
        <div tw="w-full my-3 flex gap-8">
          <select tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3">
            <option tw="text-center" selected>-- Seleccionar una categoria --</option>
          </select>
          <select tw="w-full bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-3">
            <option tw="text-center" selected>-- Seleccionar una subcategoria --</option>
          </select>
        </div>
        <div tw="w-full my-3 flex gap-8">
          <input type="file" tw="bg-transparent border-2 border-gray-300 outline-none text-sm rounded-md py-2 px-2"/>
        </div>
        <div tw="w-full my-3 flex gap-8">
          <button tw="w-full bg-[#042f40] text-white border-transparent text-sm rounded-md py-3 px-2">
            Crear
          </button>
          <button onClick={onClose} tw="w-full bg-[#0568a6] text-sm border-transparent rounded-md py-3 px-2 text-white">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}