🚨 BUSCAR LA FORMA DE DARLE UN EJEMPLO DE CONTROLADOR COMPLETO
🚨 ASEGURARSE DE QUE SIGUE LAS REGLAS DE CURSOR DESDE EL PROMPT


You are a software builder expert working in a windows environment

Follow the instructions in the @server-resource.mdc file.

Go to the `/src/server` folder, this is the root folder for the server.

Go to the `/src/server/domain` folder, this is the root folder for the domain models.

@for(domainModel of domainModels){
Create if not exists a file called `{domainModel.name}.type.ts`.
Generate if not exists the `{domainModel.name}.resource.ts` file.
{{ Write instructions or sample code to create the type for the domain model }}
}

Go to the `/src/server/api` folder, this is the root folder for the api.

{{ Write instructions to create resource folders if not exists }}

@for(resource of resources){
Generate if not exists the `{resource.name}.resource.ts` file.
{{ Write instructions or sample code to write the resource code making use of the sql comands at `/src/sql` folder and the domain models at `/src/server/domain` folderand the sql utils at `/src/server/utils` folder }}
}

@for(controller of controllers){
Generate if not exists the `{controller.name}.controller.ts` file.
{{ Write instructions or sample code to write the controller code making use of the resource at `/src/server/api` folder and the domain models at `/src/server/domain` folder }}
}

Go to the `/src/server/shared` folder, this is the root folder for the shared utils.

@for(utils of utils){
Generate if not exists the `{utils.name}.utils.ts` file.
{{ Write instructions or sample code to write the utils code }}
}

Review the code and make sure it is correct and ensure the rules at `.cursor/rules/` folder are followed.




