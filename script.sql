-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema larafacil
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema larafacil
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `larafacil` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- -----------------------------------------------------
-- Schema biblioteca
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema biblioteca
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `larafacil` ;

-- -----------------------------------------------------
-- Table `larafacil`.`fabrica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`fabrica` (
  `idFabrica` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nit` VARCHAR(255) NOT NULL,
  `nombre` VARCHAR(255) NOT NULL,
  `sitioWeb` VARCHAR(255) NOT NULL,
  `correoElectronico` VARCHAR(255) NOT NULL,
  `estado` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idFabrica`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`tipo_telefono`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`tipo_telefono` (
  `idTelefono` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipoTelefono` VARCHAR(255) NOT NULL,
  `estado` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idTelefono`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`contacto_fabrica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`contacto_fabrica` (
  `idContactoFabrica` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idFabrica` BIGINT UNSIGNED NOT NULL,
  `idTipoTelefono` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idContactoFabrica`),
  CONSTRAINT `contacto_fabrica_idfabrica_foreign`
    FOREIGN KEY (`idFabrica`)
    REFERENCES `larafacil`.`fabrica` (`idFabrica`),
  CONSTRAINT `contacto_fabrica_idtipotelefono_foreign`
    FOREIGN KEY (`idTipoTelefono`)
    REFERENCES `larafacil`.`tipo_telefono` (`idTelefono`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`failed_jobs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`failed_jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `connection` TEXT NOT NULL,
  `queue` TEXT NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `exception` LONGTEXT NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`migrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(255) NOT NULL,
  `batch` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`password_resets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`password_resets` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `password_resets_email_index` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`role` (
  `idRol` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `estado` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB
AUTO_INCREMENT = 49
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `larafacil`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `larafacil`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `remember_token` VARCHAR(100) NULL DEFAULT NULL,
  `idRol` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_email_unique` (`email` ASC) VISIBLE,
  CONSTRAINT `users_idrol_foreign`
    FOREIGN KEY (`idRol`)
    REFERENCES `larafacil`.`role` (`idRol`))
ENGINE = InnoDB
AUTO_INCREMENT = 50
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

USE `biblioteca` ;

-- -----------------------------------------------------
-- Table `biblioteca`.`autors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`autors` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`institucions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`institucions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `codigo` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`categorias` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `codigo` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(255) NOT NULL,
  `institucion_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categorias_institucion_id_foreign`
    FOREIGN KEY (`institucion_id`)
    REFERENCES `biblioteca`.`institucions` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`coleccions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`coleccions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`failed_jobs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`failed_jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) NOT NULL,
  `connection` TEXT NOT NULL,
  `queue` TEXT NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `exception` LONGTEXT NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `failed_jobs_uuid_unique` (`uuid` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`libros` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(255) NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `numeroEdicion` VARCHAR(255) NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `archivo` VARCHAR(255) NULL DEFAULT NULL,
  `lugarEdicion` VARCHAR(255) NULL DEFAULT NULL,
  `anioEdicion` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `autor_id` INT UNSIGNED NOT NULL,
  `coleccion_id` INT UNSIGNED NULL DEFAULT NULL,
  `categoria_id` INT UNSIGNED NOT NULL,
  `enabled` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `libros_autor_id_foreign`
    FOREIGN KEY (`autor_id`)
    REFERENCES `biblioteca`.`autors` (`id`),
  CONSTRAINT `libros_categoria_id_foreign`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `biblioteca`.`categorias` (`id`),
  CONSTRAINT `libros_coleccion_id_foreign`
    FOREIGN KEY (`coleccion_id`)
    REFERENCES `biblioteca`.`coleccions` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`migrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(255) NOT NULL,
  `batch` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`oauth_access_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`oauth_access_tokens` (
  `id` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `client_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `scopes` TEXT NULL DEFAULT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_access_tokens_user_id_index` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`oauth_auth_codes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`oauth_auth_codes` (
  `id` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `client_id` BIGINT UNSIGNED NOT NULL,
  `scopes` TEXT NULL DEFAULT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_auth_codes_user_id_index` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`oauth_clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`oauth_clients` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `secret` VARCHAR(100) NULL DEFAULT NULL,
  `provider` VARCHAR(255) NULL DEFAULT NULL,
  `redirect` TEXT NOT NULL,
  `personal_access_client` TINYINT(1) NOT NULL,
  `password_client` TINYINT(1) NOT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_clients_user_id_index` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`oauth_personal_access_clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`oauth_personal_access_clients` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`oauth_refresh_tokens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`oauth_refresh_tokens` (
  `id` VARCHAR(100) NOT NULL,
  `access_token_id` VARCHAR(100) NOT NULL,
  `revoked` TINYINT(1) NOT NULL,
  `expires_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `oauth_refresh_tokens_access_token_id_index` (`access_token_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`password_resets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`password_resets` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  INDEX `password_resets_email_index` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`rols` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `biblioteca`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `biblioteca`.`users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `user` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol_id` INT UNSIGNED NOT NULL,
  `remember_token` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_user_unique` (`user` ASC) VISIBLE,
  UNIQUE INDEX `users_email_unique` (`email` ASC) VISIBLE,
  CONSTRAINT `users_rol_id_foreign`
    FOREIGN KEY (`rol_id`)
    REFERENCES `biblioteca`.`rols` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
