ALTER TABLE `products` 
  ADD CONSTRAINT `fk_seller_id`
    FOREIGN KEY (`seller_id`)
    REFERENCES `sellers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION