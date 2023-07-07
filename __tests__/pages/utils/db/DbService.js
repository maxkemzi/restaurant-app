import prisma from "@/prisma/client";
import reparseObject from "../mocks/reparseObject";

class DbService {
	#prismaEntity;

	constructor(entityName) {
		this.#prismaEntity = prisma[entityName];
	}

	async exists(entity) {
		const count = await this.#prismaEntity.count({where: entity});
		return count !== 0;
	}

	async getById(id) {
		const entity = await this.#prismaEntity.findUnique({where: {id}});
		return reparseObject(entity);
	}

	async get(filter = {}, order = {}) {
		const entity = await this.#prismaEntity.findFirst({
			where: filter,
			orderBy: order
		});
		return reparseObject(entity);
	}

	async getMany(filter = {}, order = {}) {
		const entities = await this.#prismaEntity.findMany({
			where: filter,
			orderBy: order
		});
		return entities.map(entity => reparseObject(entity));
	}

	async createMany(entities) {
		const createdEntities = await prisma.$transaction(
			entities.map(entity => this.#prismaEntity.create({data: entity}))
		);
		return createdEntities.map(entity => reparseObject(entity));
	}

	async create(entity) {
		const createdEntity = await this.#prismaEntity.create({data: entity});
		return reparseObject(createdEntity);
	}
}

export default DbService;
