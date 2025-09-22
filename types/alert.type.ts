export type Alert = {
  id: string;
  tipo: string;
  status: true;
  message: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    minQuantity: number;
    category: {
      id: string;
      name: string;
      color: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};
