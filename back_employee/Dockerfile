# Etape de build avec Maven
FROM maven as builder

WORKDIR /app

# Copie du fichier pom.xml et téléchargement des dépendances
COPY back_employee/pom.xml .
RUN mvn dependency:go-offline

# Copie des fichiers sources et exécution de la construction
COPY back_employee/src ./src
RUN mvn package -DskipTests


FROM openjdk

WORKDIR /app

# Copie de l'artifact JAR depuis l'étape précédente
COPY --from=builder /app/target/back_employee-0.0.1-SNAPSHOT.jar .

# Exposition du port 8080
EXPOSE 8080

# Exécution de l'application Spring Boot
ENTRYPOINT ["java", "-jar", "back_employee-0.0.1-SNAPSHOT.jar"]


# <artifactId>back_employee</artifactId>
  #    <version>0.0.1-SNAPSHOT</version>