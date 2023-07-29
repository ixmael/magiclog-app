resource "docker_volume" "repository" {
  name = "${local.project_name}-repository-${var.environment}"
  driver_opts = {
    type   = "none"
    device = var.repository_path_to_keep_data
    // ${path.cwd}/logs/reverseproxy
    o      = "bind"
  }
}
