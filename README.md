# Magic Log App

## Infrastructure
I use *terraform* to handle the containers.

```sh
# init terroform
terraform -chdir=./infrastructure/terraform init

terraform -chdir=./infrastructure/terraform plan

terraform -chdir=./infrastructure/terraform apply

terraform -chdir=./infrastructure/terraform destroy
```
