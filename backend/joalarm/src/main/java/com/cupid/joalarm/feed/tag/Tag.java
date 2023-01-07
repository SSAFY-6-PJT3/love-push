package com.cupid.joalarm.feed.tag;

import com.cupid.joalarm.feed.entity.Feed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tag")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tag {
    @Id
    @Column(name = "tag_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(name = "name")
    private String name;

    @Builder.Default
    @ManyToMany(mappedBy = "tags",cascade = CascadeType.ALL)
    private List<Feed> feeds = new ArrayList<>();
}
