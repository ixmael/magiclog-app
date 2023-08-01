resource "docker_container" "restapi" {
  name     = "${local.project_name}-restapi-${var.environment}"
  image    = docker_image.restapi.name
  hostname = "restapi.magiclog"

  attach   = false
  must_run = true
  logs     = true
  restart  = "unless-stopped"

  depends_on = [
    docker_container.repository
  ]

  env = [
    "ENVIRONMENT=${var.environment}",
  ]

  ports {
    external = 3000
    internal = 3000
  }

  networks_advanced {
    name = docker_network.magiclog.name
    aliases = [
      "restapi"
    ]
  }
}

resource "docker_image" "restapi" {
  name = "${local.project_name}/restapi"

  build {
    path       = abspath(path.cwd)
    dockerfile = "./infrastructure/docker/restapi/dockerfile"
    // context    = path.cwd

    tag = [
      "${var.environment}"
    ]

    label = {
      author : "ixmael"
    }
  }
}
