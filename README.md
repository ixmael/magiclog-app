# MagicLog App
This is the implementation of the app test for Magic Log.

I realized that the test is required has to be developed with nodejs, but I develop this with typescript due to I can define types and its feature helps me to develop the RestAPI.

## API
The API implented is a RestAPI. The code is in *restapi* dir.

## Infrastructure
I use [terraform](https://www.terraform.io/) to handle the docker containers.

You can achieve same result with Docker Compose files, but I don't know if you can publish the images in the cloud without extra steps out of docker. Terraform gives that posibility, but at this moment I'm learning more about it.

### Setup
You require to populate the variables in the file *infrastructure/terraform/terraform.tfvars*. You have an example in *infrastructure/terraform/terraform.tfvars.example* file.

```sh
# init terroform
terraform -chdir=./infrastructure/terraform init

terraform -chdir=./infrastructure/terraform plan
```
### Run the containers
The command that creates the magic is:
```sh
# Build all the elements described
terraform -chdir=./infrastructure/terraform apply
```
this command is responsible of:
- dowload and build the images
- create networks
- create volumes
- run containers

You only has to consume your services defined.

### Delete all the docker items
You can delete all the items created (networks, containers, etc.) by *terraform* with:
```sh
terraform -chdir=./infrastructure/terraform destroy
```
