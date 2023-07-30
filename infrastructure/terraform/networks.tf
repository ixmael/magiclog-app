resource "docker_network" "magiclog" {
  name  = "${local.project_name}-magiclog-${var.environment}"
  driver = "bridge"
  // driver = "overlay"
  // internal = true
}
