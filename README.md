# Mini-Projet DevOps avec Jenkins, ArgoCD et Helm

## Objectifs du projet
Ce projet a pour objectif de conteneuriser et déployer une application web déjà développée en utilisant Docker, Kubernetes et Jenkins pour l'intégration continue (CI). L'application sera orchestrée sur un cluster Kubernetes local (par exemple, Minikube ou Kind). 

### Technologies utilisées :
- **Docker** pour la conteneurisation
- **Kubernetes** pour l'orchestration des conteneurs
- **Helm** pour le déploiement des applications sur Kubernetes
- **ArgoCD** pour la gestion du déploiement continu basé sur GitOps
- **Prometheus** et **Grafana** pour le monitoring et l’observabilité
- **Jenkins** pour l'intégration continue et l'automatisation des builds

## Étapes de réalisation

#### 1. Création des Dockerfiles

- Server : Créez un fichier **Dockerfile** dans le dossier server.

- Client : Créez un fichier **Dockerfile** dans le dossier client.

- Chaque fichier contient les instructions nécessaires pour conteneuriser leurs composants respectifs.

- Créez un fichier **docker-compose.yml** à la racine du projet pour orchestrer les conteneurs backend et frontend.

#### 2. Mise en place du CI avec Jenkins
- **Start :** Initialisation de la pipeline.

- **Checkout SCM :*** Récupération du code source depuis le dépôt.

- **Build Server Image :** Construction de l'image Docker pour le server.

- **Build Client Image :** Construction de l'image Docker pour le client.

- **Test Docker Hub Connectivity :** Vérification de la connexion au Docker Hub.

- **Push Images to Docker Hub :** Publication des images sur Docker Hub.

- **End :** Fin de la pipeline.


#### 3. Cluster Kubernetes local
Le déploiement se fera sur un cluster Kubernetes local (par exemple, Minikube, Kind ou k3s). 
Les étapes incluront :

- **Création et configuration du cluster local :** Installez et configurez le cluster Kubernetes sur votre machine locale en utilisant un des outils mentionnés (Minikube, Kind ou k3s).

- **Application des manifestes Kubernetes :** Déployez les ressources nécessaires (Deployments, Services,  etc.) en utilisant kubectl apply.

- **Utilisation de Helm Charts :** Automatisez et gérez le déploiement de vos applications avec des Helm charts pour chaque composant de votre application.

- **Intégration d'ArgoCD :** Implémentez une stratégie GitOps en intégrant ArgoCD pour automatiser et gérer les déploiements Kubernetes 

#### 3. Monitoring avec Prometheus
- Installez Prometheus et Grafana dans le namespace monitoring.

- Configurez Prometheus pour collecter les métriques des composants de l'application.
## Conclusion

Ce projet a permis de mettre en place une architecture robuste et scalable en utilisant des technologies modernes telles que Docker, Kubernetes, Helm et ArgoCD. Grâce à l'intégration de ces outils, nous avons pu automatiser le processus de déploiement continu (CI/CD), ce qui garantit une gestion efficace des versions, une rapidité de mise à jour des applications et une fiabilité accrue.



## License
Copyright (c) 2024 **[Mohamed Ouni](https://www.github.com/mohamedouni1)**

Ce projet est sous licence MIT . Veuillez consulter le fichier **[License](https://github.com/MohamedOuni1/mern-app/blob/main/LICENCE.txt/)** pour plus de détails.

