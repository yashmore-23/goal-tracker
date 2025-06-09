provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "goaltracker" {
  metadata {
    name = "goaltracker"
  }
}

