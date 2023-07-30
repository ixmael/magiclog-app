variable "environment" {
  type        = string
  description = "The environment"
  default     = "production"
}
variable "mysql_root_password" {
  type        = string
  description = "The password for the root user"
}

variable "repository_path_to_keep_data" {
  type        = string
  description = "The path to store repository data"
}
