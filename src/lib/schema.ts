import { z } from "zod";

export const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, "Informe seu nome completo (mínimo 3 caracteres)")
    .max(80, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome deve conter apenas letras"),
  email: z
    .string()
    .email("Informe um e-mail válido (ex: seu@empresa.com.br)")
    .max(100, "E-mail muito longo"),
  telefone: z
    .string()
    .min(14, "Informe o WhatsApp com DDD (ex: (11) 99999-9999)")
    .max(16, "Telefone inválido")
    .refine((val) => {
      const digitos = val.replace(/\D/g, "");
      return digitos.length === 10 || digitos.length === 11;
    }, "Telefone precisa ter 10 ou 11 dígitos"),
  nomeDaMarca: z
    .string()
    .min(2, "Informe o nome da sua marca ou empresa")
    .max(60, "Nome da marca muito longo"),
  segmento: z
    .string()
    .min(2, "Selecione ou informe o segmento de atuação")
    .max(50, "Segmento muito longo"),
  faturamentoOuPorte: z
    .string()
    .min(1, "Selecione o porte ou faturamento aproximado"),
  aceitouTermos: z
    .boolean()
    .refine((val) => val === true, "Você precisa aceitar os termos para continuar"),
});

export type CadastroForm = z.infer<typeof cadastroSchema>;
