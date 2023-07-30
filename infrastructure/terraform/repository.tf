resource "docker_container" "repository" {
  name     = "${local.project_name}-repository-${var.environment}"
  image    = "mysql:8.0.34"
  hostname = "repository.magiclog"

  env = [
    "MYSQL_ROOT_PASSWORD=${var.mysql_root_password}",
    "ENVIRONMENT=${var.environment}",
  ]

  ports {
    external = 3306
    internal = 3306
  }

  volumes {
    volume_name    = docker_volume.repository.name
    container_path = "/var/lib/mysql"
  }

  networks_advanced {
    name = docker_network.magiclog.name
    aliases = [
      "repository"
    ]
  }
}
