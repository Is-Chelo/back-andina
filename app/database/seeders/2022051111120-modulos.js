'use strict';
// const { rolesModulo } = require("../../models/index");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('modulos', modules);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('modulos', null, {});
	},
};

const modules = [
	{
		name: 'Dashboard',
		url: '/api/v1/dashboard',
		icon: 'IconBrandReact',
		type: 'home',
		path_front: '/dashboard',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Docentes',
		url: '/api/v1/teacher',
		icon: 'IconUsers',
		type: 'users',
		path_front: '/docentes',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Estudiantes',
		url: '/api/v1/student',
		icon: 'IconUser',
		type: 'users',
		path_front: '/estudiantes',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Coordinadores',
		url: '/api/v1/coordinador',
		icon: 'IconUserSearch',
		type: 'users',
		path_front: '/coordinadores',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	// Settings
	{
		name: 'Matriculaciones',
		url: '/api/v1/matricula',
		icon: 'IconNotebook',
		type: 'settings',
		path_front: '/matriculaciones',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Areas',
		url: '/api/v1/area',
		icon: 'IconBoxPadding',
		type: 'settings',
		path_front: '/areas',
		createdAt: new Date(),
		updatedAt: new Date(),
	},

	{
		name: 'Programas',
		url: '/api/v1/program',
		icon: 'IconFileCode2',
		type: 'settings',
		path_front: '/programas',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Asignaturas',
		url: '/api/v1/subject',
		icon: 'IconClipboardCheck',
		type: 'settings',
		path_front: '/asignaturas',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Calificaciones',
		url: '/api/v1/grades-student',
		icon: 'IconNotes',
		type: 'home',
		path_front: '/calificaciones',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Kardex',
		url: '/api/v1/kardex',
		icon: 'IconClipboardList',
		type: 'home',
		path_front: '/kardex',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Roles',
		url: '/api/v1/role',
		icon: 'IconTool',
		type: 'permissions',
		path_front: '/roles',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Permissions',
		url: '/api/v1/module',
		icon: 'IconShieldLock',
		type: 'permissions',
		path_front: '/permissions',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Modulos por rol',
		url: '/api/v1/role-module',
		icon: 'IconShieldLock',
		type: '',
		path_front: '/role-modules',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: 'Usuarios',
		url: '/api/v1/auth',
		icon: 'IconUser',
		type: 'permissions',
		path_front: '/users',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
