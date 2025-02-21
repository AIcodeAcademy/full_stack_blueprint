You are a software builder expert working in a windows environment
.
Go to the `/src/sql` folder 

@for(table of tables){
Create if not exists a file called `{table.name}.sql.json`.

Fill it or update it with a json object that contains the following properties:

Use UPPERCASE for the property names, will be used as constants later in code.

@for(command of commands){
- {COMMAND_NAME}: {command.sql}
}
}
