import supertest from 'supertest';
import app, { init } from '../../src/app';
import { prisma } from '../../src/config/database';
import * as cpfFactory from '../factories/cpfFactory';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE blacklist`;
});

describe('POST /cpf', () => {
  it('Deve adicionar um cpf à blacklist e retornar o código 200', async () => {
    const cpf = cpfFactory.createCpf();

    const response = await supertest(app).post('/cpf').send({ cpf });
    expect(response.status).toBe(201);
  });
  it('Deve tentar adicionar um cpf inválido e retornar o código 400', async () => {
    const cpf = '11111111111';

    const response = await supertest(app).post('/cpf').send({ cpf });
    expect(response.status).toBe(400);
  });
  it('Deve tentar adicionar um cpf que já existe e retornar o código 409', async () => {
    const cpf = cpfFactory.createCpf();

    await supertest(app).post('/cpf').send({ cpf });

    const response = await supertest(app).post('/cpf').send({ cpf });
    expect(response.status).toBe(409);
  });

  describe('GET /cpf/:cpf', () => {
    it('Deve consultar um cpf já cadastrado, retornar o código 200 e um objeto com os dados do cpf', async () => {
      const cpf = cpfFactory.createCpf();

      await supertest(app).post('/cpf').send({ cpf });

      const response = await supertest(app).get(`/cpf/${cpf}`).send();
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('cpf');
      expect(response.body).toHaveProperty('createdAt');
    });
    it('Deve consultar um cpf não cadastrado e retornar o código 404', async () => {
      const cpf = cpfFactory.createCpf();

      const response = await supertest(app).get(`/cpf/${cpf}`).send();
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
    });
    it('Deve consultar um cpf inválido e retornar o código 400', async () => {
      const cpf = '111111';

      const response = await supertest(app).get(`/cpf/${cpf}`).send();
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('DELETE /cpf/:cpf', () => {
    it('Deve remover um cpf já cadastrado e retornar o código 200', async () => {
      const cpf = cpfFactory.createCpf();
      await supertest(app).post('/cpf').send({ cpf });

      const response = await supertest(app).delete(`/cpf/${cpf}`).send();
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
    it('Deve tentar remover um cpf não cadastrado e retornar o código 404', async () => {
      const cpf = cpfFactory.createCpf();
      const response = await supertest(app).delete(`/cpf/${cpf}`).send();

      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
    });
    it('Deve tentar remover um cpf inválido e retornar o código 400', async () => {
      const cpf = 'xasda45';
      const response = await supertest(app).delete(`/cpf/${cpf}`).send();

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /cpf', () => {
    it('Deve retornar um array com todos os cpfs adicionados na blacklist e o código 200', async () => {
      const cpf = cpfFactory.createCpf();
      await supertest(app).post('/cpf').send({ cpf });

      const cpf2 = cpfFactory.createCpf();
      await supertest(app).post('/cpf').send({ cpf: cpf2 });

      const cpf3 = cpfFactory.createCpf();
      await supertest(app).post('/cpf').send({ cpf: cpf3 });

      const response = await supertest(app).get('/cpf').send();
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});

afterAll(async () => {
  prisma.$disconnect;
});
