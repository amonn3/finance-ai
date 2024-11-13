import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_CATEGORY_MAP = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilitários",
};

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [PaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [PaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [PaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [PaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [PaymentMethod.CASH]: "money.svg",
  [PaymentMethod.PIX]: "pix.svg",
  [PaymentMethod.OTHER]: "other.svg",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  PIX: "PIX",
  OTHER: "Outros",
};

export const TRANSACTION_TYPES_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.BANK_TRANSFER,
    label: "Transferência Bancária",
  },
  {
    value: PaymentMethod.BANK_SLIP,
    label: "Boleto Bancário",
  },
  {
    value: PaymentMethod.CASH,
    label: "Dinheiro",
  },
  {
    value: PaymentMethod.CREDIT_CARD,
    label: "Cartão de Crédito",
  },
  {
    value: PaymentMethod.DEBIT_CARD,
    label: "Cartão de Débito",
  },
  {
    value: PaymentMethod.PIX,
    label: "PIX",
  },
  {
    value: PaymentMethod.OTHER,
    label: "Outros",
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.EDUCATION,
    label: "Educação",
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: "Entretenimento",
  },
  {
    value: TransactionCategory.FOOD,
    label: "Alimentação",
  },
  {
    value: TransactionCategory.HEALTH,
    label: "Saúde",
  },
  {
    value: TransactionCategory.HOUSING,
    label: "Moradia",
  },
  {
    value: TransactionCategory.OTHER,
    label: "Outros",
  },
  {
    value: TransactionCategory.SALARY,
    label: "Salário",
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: "Transporte",
  },
  {
    value: TransactionCategory.UTILITY,
    label: "Utilitários",
  },
];
