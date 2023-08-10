import { z } from 'zod';

export const calculateCommissionArgsDTO = z.tuple([
  z.string().nonempty(),
  z.coerce.date(),
  z.coerce.date(),
]);
