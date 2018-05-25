insert into users (username, active, createdAt, updatedAt) values ('denimar', true, now(), now());
insert into users (username, active, createdAt, updatedAt) values ('ariani', true, now(), now());
insert into users (username, active, createdAt, updatedAt) values ('clarinha', false, now(), now());

insert into repositories (fullName, createdAt, updatedAt) values ('facebook/react', now(), now());
insert into repositories (fullName, createdAt, updatedAt) values ('reduxjs/redux', now(), now());
insert into repositories (fullName, createdAt, updatedAt) values ('facebook/create-react-app', now(), now());
insert into repositories (fullName, createdAt, updatedAt) values ('reduxjs/redux-devtools', now(), now());
insert into repositories (fullName, createdAt, updatedAt) values ('vuejs/vue', now(), now());
insert into repositories (fullName, createdAt, updatedAt) values ('angular/angular', now(), now());

insert into user_selected_branches (repositoryId, branchId, userId, updatedAt, createdAt) values (1, 'd5b409002b425d2242da0d9bacfad68278856400', 1, now(), now());
insert into user_selected_branches (repositoryId, branchId, userId, updatedAt, createdAt) values (1, 'd5b409002b425d2242da0d9bacfad68278856400', 1, now(), now());
insert into user_selected_branches (repositoryId, branchId, userId, updatedAt, createdAt) values (1, 'd5b409002b425d2242da0d9bacfad68278856400', 1, now(), now());

insert into user_selected_repositories (repositoryId, userId, createdAt, updatedAt) values (1, 1, now(), now());
insert into user_selected_repositories (repositoryId, userId, createdAt, updatedAt) values (2, 1, now(), now());
insert into user_selected_repositories (repositoryId, userId, createdAt, updatedAt) values (3, 1, now(), now());